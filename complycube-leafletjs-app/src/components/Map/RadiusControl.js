function RadiusControl({ radius, setRadius }) {
  return (
    <div className="radius-control">
      <label htmlFor="radius">Set Radius (meters): </label>
      <input
        type="number"
        id="radius"
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
        min="100"
        step="100"
      />
    </div>
  );
}

export default RadiusControl;
