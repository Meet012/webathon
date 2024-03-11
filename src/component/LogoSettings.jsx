import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import CustomButton from './CustomButton';

const LogoSettings = ({ onChange }) => {
    const snap = useSnapshot(state);
    const [logoX, setLogoX] = useState(snap.logoX);
    const [logoY, setLogoY] = useState(snap.logoY);
    const [logoSize, setLogoSize] = useState(snap.logoSize);

    const handleLogoXChange = (e) => {
        setLogoX(e.target.value);
        onChange({ logoX: e.target.value });
    };

    const handleLogoYChange = (e) => {
        setLogoY(e.target.value);
        onChange({ logoY: e.target.value });
    };

    const handleLogoSizeChange = (e) => {
        setLogoSize(e.target.value);
        onChange({ logoSize: e.target.value });
    };

    const handleLogoClick = () => {
        console.log(logoX,logoY,logoSize);
        state.logoX = logoX;
        state.logoY = logoY;
        state.logoSize = logoSize;
    };

    const handleBackLogoClick = () => {
        console.log(logoX,logoY,logoSize);
        state.isBackLogoTexture = !state.isBackLogoTexture;
    };

    return (
        <div className="sizepicker-container">
            <div className='flex flex-col'>
                <div>
                    <label htmlFor="logoX">Logo X position:</label>
                    <input type="number" id="logoX" className="border border-gray-300 rounded px-2 py-1" placeholder="X location" value={logoX} onChange={handleLogoXChange} />
                    <label htmlFor="logoY">Logo Y position:</label>
                    <input type="number" id="logoY" className="border border-gray-300 rounded px-2 py-1" placeholder="Y location" value={logoY} onChange={handleLogoYChange} />
                    <label htmlFor="logoSize">Logo Size:</label>
                    <input type="number" id="logoSize" className="border border-gray-300 rounded px-2 py-1" placeholder="Size" value={logoSize} onChange={handleLogoSizeChange} />
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                <CustomButton 
                    type={snap.isLogoTexture ? "filled" : "outline"}
                    title="Logo"
                    handleClick={handleLogoClick}
                    customStyles="text-xs"
                />
                <CustomButton 
                    type={snap.isBackLogoTexture ? "filled" : "outline"}
                    title="Back Logo"
                    handleClick={handleBackLogoClick}
                    customStyles="text-xs"
                />
            </div>
        </div>
    );
};

export default LogoSettings;
