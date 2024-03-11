import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('./shirt_baked.glb');
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    const backTexture = useTexture(snap.backDecal);

    const meshRef = useRef();
    const [logoPosition, setLogoPosition] = useState([snap.logoX, snap.logoY, 0.15]);
    const [backPosition, setBackPosition] = useState([snap.backLogoX, snap.backLogoY, -0.15]);


    useFrame((state, delta) => {
        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
        // Rotate the mesh
        if(snap.into){
          meshRef.current.rotation.y += 0; // Adjust the rotation speed as needed
        }else{
            if (snap.rotate) {
                meshRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
            }
        }
    });

    const stateString = JSON.stringify(snap);

    return (
        // With the help of key react will render the model whenever the state changes
        <group key={stateString}>
            <mesh
                ref={meshRef}
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null} // Call handleMouseMove on mouse move
            >
                {snap.isFullTexture && (
                    <Decal position={[0, 0, 0]} rotation={[0,0, 0]} scale={1} map={fullTexture} />
                )}

                {snap.isLogoTexture && (
                    <Decal
                        position={logoPosition} // Use logoPosition state to set the position dynamically
                        rotation={[0, 0,0]}
                        scale={snap.logoSize}
                        map={logoTexture}
                        depthTest={false}
                        anisotropy={16}
                        depthWrite={true}
                    />
                )}

                {snap.isBackLogoTexture && (
                    <Decal
                        position={backPosition} // Use logoPosition state to set the position dynamically
                        rotation={[0, 0,0]}
                        scale={snap.backLogoSize}
                        map={backTexture}
                        depthTest={false}
                        anisotropy={16}
                        depthWrite={true}
                    />
                )}  

            </mesh>
        </group>
    );
};

export default Shirt;
