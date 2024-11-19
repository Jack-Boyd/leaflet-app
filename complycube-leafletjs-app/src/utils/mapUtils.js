import L from 'leaflet';

export const createColoredIcon = (amenityType) => {
  const colorMap = {
    restaurant: 'red',
    cafe: 'blue',
    fast_food: 'orange',
    bar: 'green',
    pub: 'purple',
    default: 'gray',
  };

  const color = colorMap[amenityType] || colorMap.default;

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid black;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
  });
};
