import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function useTour() {
    
    useEffect(() => {

        const hasSeenTour = localStorage.getItem("hasSeenTour");

        if (!hasSeenTour) {
            const driverObj = driver({
                showProgress: true,
                showButtons: true,
                steps: [
                    {
                        element: "#container-elements",
                        popover: {
                        title: "Container Elements",
                        description: "Here you find different elements to create an amazing Readme for your repository.",
                        },
                    },
                    {
                        element: "#readme-canvas",
                        popover: {
                        title: "Readme Canvas",
                        description: "Here you can drag and drop the elements for you can customize the content of your Readme.",
                        },
                    },
                    {
                        element: "#readme-code-live",
                        popover: {
                        title: "Readme Code Live",
                        description: "Here you can see the code live preview of your Readme.",
                        },
                    },
                    {
                        element: "#readme-code-copy",
                        popover: {
                        title: "Readme Code Copy",
                        description: "Here you can copy the markdown code of your Readme.",
                        },
                    },
                ],
            });

            driverObj.drive();

            localStorage.setItem("hasSeenTour", "true");
        }
    }, []);

}