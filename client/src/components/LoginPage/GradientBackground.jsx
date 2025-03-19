import React, { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Define gradient colors - using your dark blue and accent colors
    const colors = [
      { x: 0, y: 0, color: '#0A192F' },      // Dark blue (top left)
      { x: canvas.width, y: 0, color: '#1E3A6D' },   // Medium blue (top right)
      { x: 0, y: canvas.height, color: '#102445' },  // Deep blue (bottom left)
      { x: canvas.width, y: canvas.height, color: '#4D9AFF' }, // Bright blue accent (bottom right)
      { x: canvas.width / 2, y: canvas.height / 2, color: '#152A45' } // Center color
    ];

    // Create moving points that will influence the gradient
    const points = colors.map(color => ({
      x: color.x,
      y: color.y,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
      color: color.color
    }));

    // Animation function
    const animate = () => {
      // Update point positions with gentle movements
      points.forEach(point => {
        // Only move certain points, keep corners somewhat fixed
        if (!(point.x === 0 && point.y === 0) &&
          !(point.x === canvas.width && point.y === 0) &&
          !(point.x === 0 && point.y === canvas.height) &&
          !(point.x === canvas.width && point.y === canvas.height)) {

          point.x += point.vx;
          point.y += point.vy;

          // Bounce off edges with a margin
          const margin = 100;
          if (point.x < margin || point.x > canvas.width - margin) {
            point.vx *= -1;
          }
          if (point.y < margin || point.y > canvas.height - margin) {
            point.vy *= -1;
          }
        }
      });

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient
      drawGradient(ctx, canvas.width, canvas.height, points);

      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Function to draw gradient based on points
  const drawGradient = (ctx, width, height, points) => {
    // Create an off-screen canvas for the gradient
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');

    // Fill with base color
    offCtx.fillStyle = '#0A192F';
    offCtx.fillRect(0, 0, width, height);

    // Draw radial gradients for each point
    points.forEach(point => {
      const gradient = offCtx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, Math.max(width, height) * 0.8
      );

      gradient.addColorStop(0, point.color);
      gradient.addColorStop(1, 'rgba(10, 25, 47, 0)'); // Fade to transparent

      offCtx.fillStyle = gradient;
      offCtx.globalCompositeOperation = 'lighter';
      offCtx.fillRect(0, 0, width, height);
    });

    // Draw the final result to the main canvas
    ctx.drawImage(offCanvas, 0, 0);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

// Login component that uses the gradient background
const HeyPage = () => {
  return (
    <>
      <GradientBackground />
      <div className="login-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}>
        <div className="login-card" style={{
          background: 'rgba(15, 30, 60, 0.7)',
          backdropFilter: 'blur(8px)',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          width: '380px',
          border: '1px solid rgba(77, 154, 255, 0.2)'
        }}>
          <h2 style={{
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '24px'
          }}>Login</h2>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#8892B0',
              marginBottom: '8px',
              fontSize: '14px'
            }}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(12, 25, 45, 0.6)',
                border: '1px solid rgba(77, 154, 255, 0.3)',
                color: 'white',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#8892B0',
              marginBottom: '8px',
              fontSize: '14px'
            }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(12, 25, 45, 0.6)',
                border: '1px solid rgba(77, 154, 255, 0.3)',
                color: 'white',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <button style={{
            width: '100%',
            padding: '12px',
            background: '#4D9AFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>Log In</button>
        </div>
      </div>
    </>
  );
};

export default HeyPage;