'use client'

import React, { useEffect, useRef } from 'react'

const HeroCanvas = ({ features = false }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext('webgl')
        if (!gl) {
            console.error('WebGL not supported')
            return
        }

        const vertexShaderSource = `
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `

        const fragmentShaderSource = `
            precision highp float;
            uniform float time;
            uniform vec2 resolution;
            uniform bool showFeatures;
            varying vec2 vUv;

            // Simplex 3D Noise 
            vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

            float snoise(vec3 v){ 
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 = v - i + dot(i, C.xxx) ;

                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );

                vec3 x1 = x0 - i1 + 1.0 * C.xxx;
                vec3 x2 = x0 - i2 + 2.0 * C.xxx;
                vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

                i = mod(i, 289.0 ); 
                vec4 p = permute( permute( permute( 
                            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                float n_ = 1.0/7.0; // N=7
                vec3  ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                            dot(p2,x2), dot(p3,x3) ) );
            }

            // Function to draw a soft rectangle (mock UI element)
            float rect(vec2 uv, vec2 center, vec2 size) {
                vec2 d = abs(uv - center) - size;
                return smoothstep(0.01, 0.0, max(d.x, d.y));
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / resolution.xy;
                float t = time * 0.15;
                
                // Base background fluid
                float noise1 = snoise(vec3(uv.x * 2.0, uv.y * 2.0, t));
                float noise2 = snoise(vec3(uv.x * 3.0 + noise1, uv.y * 3.0 + noise1, t * 1.5));
                float intensity = (noise1 + noise2) * 0.5 + 0.5;
                intensity = smoothstep(0.4, 0.6, intensity);
                
                // White/Light Brand Palette for Featured look
                vec3 colorMain = vec3(1.0, 0.4, 0.0);    // Orange #FF6600
                vec3 colorBg = vec3(0.05, 0.05, 0.1);    // Dark Navy
                
                vec3 color = mix(colorBg, colorMain, intensity * 0.6);
                
                if (showFeatures) {
                    // Add floating mock UI elements to "feature" the brand/website
                    float r1 = rect(uv, vec2(0.5 + sin(t*0.5)*0.2, 0.6 + cos(t*0.4)*0.1), vec2(0.3, 0.15));
                    float r2 = rect(uv, vec2(0.3 + cos(t*0.6)*0.1, 0.3 + sin(t*0.7)*0.1), vec2(0.2, 0.1));
                    float r3 = rect(uv, vec2(0.7 + sin(t*0.8)*0.1, 0.4 + cos(t*0.5)*0.15), vec2(0.15, 0.2));
                    
                    color = mix(color, vec3(1.0), r1 * 0.15); // Layered glass blocks
                    color = mix(color, colorMain, r2 * 0.3);
                    color = mix(color, vec3(0.7, 0.8, 1.0), r3 * 0.2);
                }
                
                // Highlight at center
                float dist = distance(uv, vec2(0.5));
                color += vec3(1.0, 0.6, 0.2) * (1.0 - smoothstep(0.0, 0.8, dist)) * 0.2;

                gl_FragColor = vec4(color, 1.0);
            }
        `

        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }
            return shader
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

        const program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program))
            return
        }

        const positionAttributeLocation = gl.getAttribLocation(program, 'position')
        const timeUniformLocation = gl.getUniformLocation(program, 'time')
        const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution')
        const showFeaturesUniformLocation = gl.getUniformLocation(program, 'showFeatures')

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

        const render = (time) => {
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            gl.useProgram(program)
            gl.enableVertexAttribArray(positionAttributeLocation)
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

            gl.uniform1f(timeUniformLocation, time * 0.001)
            gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
            gl.uniform1i(showFeaturesUniformLocation, features ? 1 : 0)

            gl.drawArrays(gl.TRIANGLES, 0, 6)
            requestAnimationFrame(render)
        }

        const handleResize = () => {
            canvas.width = canvas.parentElement.clientWidth
            canvas.height = canvas.parentElement.clientHeight
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        requestAnimationFrame(render)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [features])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                background: '#0a0a0a'
            }}
        />
    )
}

export default HeroCanvas
