import { useEffect, useState, useMemo } from 'react';
import { Circle, Marker, Popup } from 'react-leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { createColoredIcon } from '../../utils/mapUtils';
import useDebounce from '../../hooks/useDebounce';
import FilterComponent from './Filter';
import RadiusControl from './RadiusControl';
import LegendComponent from './Legend';
import './Map.css';

const position = [51.5036472, -0.0174945];

function Map() {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [radius, setRadius] = useState(1000);
  const debouncedRadius = useDebounce(radius, 500);

  useEffect(() => {
    const fetchGeoData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: "data=" + encodeURIComponent(`
              [out:json];
              node
                ["amenity"~"restaurant|cafe|fast_food|bar|pub"]
                (around:${debouncedRadius}, 51.5036472, -0.0174945);
              out body;
              >;
              out skel qt;
          `),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setGeoData(data);
      } catch (ex) {
        setError(ex.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoData();
  }, [debouncedRadius]);

  const filteredData = useMemo(() => {
    if (!geoData || filter === 'all') return geoData;
    return {
      ...geoData,
      elements: geoData.elements.filter(element => element.tags.amenity === filter),
    };
  }, [geoData, filter]);

  const renderMarkers = () => {
    return filteredData?.elements?.map((element, index) => (
      <Marker
        key={index}
        position={[element.lat, element.lon]}
        icon={createColoredIcon(element.tags.amenity)}
      >
        <Popup>
          <strong>{element.tags.name || 'Unnamed'}</strong><br />
          Type: {formatAmenityType(element.tags.amenity)}
        </Popup>
      </Marker>
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <FilterComponent setFilter={setFilter} />
      <RadiusControl radius={radius} setRadius={setRadius} />
      <LegendComponent />
      <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={position} pathOptions={{ fillColor: 'blue' }} radius={radius} />
        <Marker position={position}>
          <Popup>
            Center Location
          </Popup>
        </Marker>
        {renderMarkers()}
      </MapContainer>
    </>
  );
}

function formatAmenityType(amenityType) {
  return amenityType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default Map;
