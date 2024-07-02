// Map.js
import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
const MapComponent = ({ coordinates, formData, onSketchCreation }) => {
    const [arcGISModules, setArcGISModules] = useState(null);
    const [popupData, setPopupData] = useState({});
    
    useEffect(() => {
        console.log("Data got updated")
        console.log(popupData)
        setPopupData(formData)
    }, [formData])


    useEffect(() => {
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/widgets/Sketch'], { css: true })
        .then(([Map, MapView, GraphicsLayer, Graphic, Sketch]) => {
            const map = new Map({
                basemap: 'streets'
            });

            const view = new MapView({
                container: 'mapView',
                map: map,
                center: [-52.712830, 47.560539], // [long, lat]
                zoom: 12
            });

            // Create a graphics layer
            const graphicsLayer = new GraphicsLayer();
     
            // Add the graphics layer to the map
            map.add(graphicsLayer);


            view.when(() => {
                
            });

            
            setArcGISModules({ map, view, graphicsLayer, Graphic, Sketch });

        })
        .catch((err) => console.error('ArcGIS modules failed to load', err));
    }, []);
    
    const addSketch = () => {
        const { map, view, graphicsLayer, Graphic, Sketch } = arcGISModules;

        const sketch = new Sketch({
            layer: graphicsLayer,
            view: view
        });

        sketch.on("create", function(event) {
            // check if the create event's state has changed to complete indicating
            // the graphic create operation is completed.
            if (event.state === "complete") {
                
                console.log(popupData)
                let contentString = ""

                

                for(const key in popupData){
                    if(popupData[key].type=="coordinates"){
                        contentString += "<h3>"+key+"</h3>"

                        for(const keyCoordinate in popupData[key].value){

                            contentString += "<h4>"+keyCoordinate+"</h4><p>"+popupData[key].value[keyCoordinate]+"</p>"
                        }
                        
                    }else{
                        contentString += "<h3>"+key+"</h3><p>"+popupData[key].value+"</p>"
                    }
                }

                let popupTemplate = {
                    title: "Sketch",
                    content: contentString,
                };

                event.graphic.popupTemplate = popupTemplate;
                
                setPopupData({})
                onSketchCreation()

                // const template = {
                //     "title": "TEST",
                //     "content": "<p>TEST</p>",
                // }
                // event.graphic.popupTemplate = template;

                // console.log("Graphic created:", event.graphic.geometry.toJSON());
                
                // onSketchCreation()

                // console.log(graphicsLayer.graphics)
                sketch.destroy();
            }
        });
        
        view.ui.add(sketch, "top-right");
    }

    return (
        <>
            <button onClick={addSketch}>Start sketching</button>
            <div id="mapView" style={{ height: '100vh' }}></div>;
        </>
    )
        
};

export default MapComponent;
