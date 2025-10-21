import { useState, useRef, useEffect } from 'react';
import BackToHome from "./BackToHome";

export default function ColorPicker({ onColorChange, initialColor = { h: 0, s: 100, l: 50 } }) {
  const [hue, setHue] = useState(initialColor.h);
  const [saturation, setSaturation] = useState(initialColor.s);
  const [lightness, setLightness] = useState(initialColor.l);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);

  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 1/6) { r = c; g = x; b = 0; }
    else if (1/6 <= h && h < 2/6) { r = x; g = c; b = 0; }
    else if (2/6 <= h && h < 3/6) { r = 0; g = c; b = x; }
    else if (3/6 <= h && h < 4/6) { r = 0; g = x; b = c; }
    else if (4/6 <= h && h < 5/6) { r = x; g = 0; b = c; }
    else if (5/6 <= h && h < 1) { r = c; g = 0; b = x; }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= radius) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const h = (angle + 360) % 360;
          const s = (dist / radius) * 100;
          const rgb = hslToRgb(h, s, 50);
          ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    const indicatorX = centerX + (saturation / 100) * radius * Math.cos((hue * Math.PI) / 180);
    const indicatorY = centerY + (saturation / 100) * radius * Math.sin((hue * Math.PI) / 180);
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 5, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel();
  }, [hue, saturation]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    updateColor(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      updateColor(e);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const updateColor = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const dist = Math.sqrt(x * x + y * y);
    if (dist <= radius) {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setHue((angle + 360) % 360);
      setSaturation((dist / radius) * 100);
    }
  };

  const handleHexChange = (e) => {
    const hex = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      const rgb = hexToRgb(hex);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setHue(hsl.h);
        setSaturation(hsl.s);
        setLightness(hsl.l);
      }
    }
  };

  const currentRgb = hslToRgb(hue, saturation, lightness);
  const hex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b);

  useEffect(() => {
    if (onColorChange) {
      onColorChange({ h: hue, s: saturation, l: lightness, rgb: currentRgb, hex });
    }
  }, [hue, saturation, lightness, onColorChange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Color Picker</h1>

        {/* Color Wheel */}
        <div className="mb-4 flex justify-center">
          <canvas
            ref={canvasRef}
            width={180}
            height={180}
            className="border-2 border-gray-300 rounded-full cursor-crosshair shadow-md"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        {/* Sliders */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Hue: {Math.round(hue)}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Saturation: {Math.round(saturation)}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Lightness: {lightness}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={lightness}
              onChange={(e) => setLightness(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Color Preview */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">Selected Color</label>
          <div
            className="w-full h-12 rounded-md border-2 border-gray-300 shadow-inner"
            style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
          ></div>
        </div>

        {/* Hex Input */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">Hex Code</label>
          <input
            type="text"
            value={`#${hex}`}
            onChange={handleHexChange}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#000000"
          />
        </div>

        {/* Preset Colors */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">Presets</label>
          <div className="grid grid-cols-8 gap-1">
            {[
              '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
            ].map((color) => (
              <button
                key={color}
                onClick={() => {
                  const rgb = hexToRgb(color);
                  if (rgb) {
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    setHue(hsl.h);
                    setSaturation(hsl.s);
                    setLightness(hsl.l);
                  }
                }}
                className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
      <BackToHome challengeTitle="Color Picker" challengeDay="060" />
    </div>
  );
}