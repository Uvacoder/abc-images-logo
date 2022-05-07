import React from "react";

import { fabric } from "fabric";

export default function Canvas({imageList}) {
  React.useEffect(() => {
    const canvas = new fabric.Canvas("canvas");
    const numImages = imageList.length
    
    const squareOutterBoxSize = Math.min(canvas.getHeight(), canvas.getWidth()/numImages)

    for (let i = 0; i < imageList.length; i++) {
      fabric.loadSVGFromURL(imageList[i], function(objects, options) {
        const object = fabric.util.groupSVGElements(objects, options);
        const scaledObject = scaleObjectToSquare(object, squareOutterBoxSize);
        const xExtraSpace = squareOutterBoxSize - scaledObject.getScaledWidth()
        const yExtraSpace = squareOutterBoxSize - scaledObject.getScaledHeight()
        scaledObject.set({
          left: squareOutterBoxSize*i + xExtraSpace/2,
          top: yExtraSpace/2,
        });
        canvas.add(scaledObject).renderAll();
      });
    }

    // UseEffect's cleanup function
    return () => {
      canvas.dispose();
    };
  }, [imageList]);

  return (
    <div className="App">
      <canvas id="canvas" width="700" height="300" />
    </div>
  );

  function scaleObjectToSquare(obj: fabric.Object | fabric.Group, squareSize: number) {
    const origHeight = obj.getScaledWidth();
    const origWidth = obj.getScaledHeight();
    const imageScaleFactor = squareSize / Math.max(origHeight, origWidth);
    const newobj = obj.scale(imageScaleFactor);
    return newobj;
  }
}
