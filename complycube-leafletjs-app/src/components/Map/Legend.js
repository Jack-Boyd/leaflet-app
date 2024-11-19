function LegendComponent() {
  const legendItems = [
    { type: 'Restaurant', color: 'red' },
    { type: 'Cafe', color: 'blue' },
    { type: 'Fast Food', color: 'orange' },
    { type: 'Bar', color: 'green' },
    { type: 'Pub', color: 'purple' },
  ];

  return (
    <div className="legend-container">
      <h4>Map Legend</h4>
      {legendItems.map((item, index) => (
        <div key={index} className="legend-item">
          <div
            style={{
              backgroundColor: item.color,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'inline-block',
              marginRight: '10px',
              border: '1px solid black',
            }}
          ></div>
          {item.type}
        </div>
      ))}
    </div>
  );
}

export default LegendComponent;
