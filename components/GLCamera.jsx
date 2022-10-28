import React, { useEffect, useMemo, useReducer } from 'react'
import { GLSL, Node, Shaders } from 'gl-react';
import { Camera, CameraType } from 'expo-camera';

const shader = Shaders.create({
    YFlip: {
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        void main(){
            gl_FragColor=texture2D(t, vec2(1.0 - uv.x, 1.0 - uv.y));
        }`,
    },
})

const GLCamera = (props) => {
    const cameraRef = useMemo(() => props.cameraRef, [])

    // force update tricks for functional components
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        let stopId;
        const loop = () => {
            stopId = requestAnimationFrame(loop)
            forceUpdate()
        }
        loop()
        return () => {
            console.log("cancel");
            cancelAnimationFrame(stopId)
        }
    }, [])
    
    return (
        <Node
            blendFunc={{ src: "one", dst: "one minus src alpha" }}
            shader={shader.YFlip}
            uniforms={{
                t: () => props.cameraRef.current || null
            }}
        >
            <Camera
                ref={cameraRef}
                style={{ flex: 1 }}
                type={CameraType.back}
            />
        </Node>
    )
}

export default GLCamera