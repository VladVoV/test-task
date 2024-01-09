import MapComponent from './Components/MapComponent';
import "leaflet/dist/leaflet.css"

const App = () => {

    return (
        <div>
            <MapComponent/>
            <div>Для додавання позначки, потрібно просто нажати на будь-яке місце на карті, а потім додати опис і посилання на фотографію</div>
        </div>
    );
};

export default App;
