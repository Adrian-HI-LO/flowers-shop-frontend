const PETAL_COUNT = 42;

const PetalRain = () => {
  const petals = Array.from({ length: PETAL_COUNT }, (_, index) => ({
    id: index,
    left: `${(index * 4.7 + 3) % 100}%`,
    delay: `${(index * 0.28).toFixed(2)}s`,
    duration: `${(6.8 + (index % 8) * 0.95).toFixed(2)}s`,
    drift: `${(18 + (index % 7) * 7)}px`,
    size: `${(8 + (index % 6) * 2.1).toFixed(1)}px`,
    opacity: (0.22 + (index % 6) * 0.08).toFixed(2),
    rotateOffset: `${(index % 9) * 15}deg`,
  }));

  return (
    <div className="petal-rain" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal-item"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: `calc(${petal.size} * 0.72)`,
            opacity: petal.opacity,
            '--petal-drift': petal.drift,
            '--petal-rotate-start': petal.rotateOffset,
          }}
        />
      ))}
    </div>
  );
};

export default PetalRain;
