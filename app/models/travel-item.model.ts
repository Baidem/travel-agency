export interface TravelItem {
    id: number;
    image: string;
    title: string;
    destination: string;
    shortDescription: string;
    longDescription: string;
    price: number;
}

export namespace TravelItem {
    export function generateFakeData(): TravelItem[] {
        return [
            {
                id: 1,
                image: "https://picsum.photos/id/318/300",
                title: "Lorem ipsum dolor sit amet, consectetur ",
                destination: "Paris, France",
                shortDescription: "Pellentesque tempor orci ut nibh maximus tempus. Donec non vestibulum eros.",
                longDescription: "Suspendisse consectetur felis massa, laoreet posuere odio scelerisque sit amet. Curabitur in felis at ex sodales blandit id quis elit. Pellentesque tempor orci ut nibh maximus tempus. Donec non vestibulum eros, non tincidunt mauris. Donec et consequat ligula, nec imperdiet ligula. Curabitur dignissim sapien lacinia, maximus sapien non, pulvinar purus.",
                price: 1249.99,
            },
            {
                id: 2,
                image: "https://picsum.photos/id/376/300",
                title: "Aenean in lectus a justo malesuada aliquam.",
                destination: "New York, USA",
                shortDescription: "Vestibulum in sapien nec sapien scelerisque iaculis.",
                longDescription: "Mauris ut tortor vel justo lacinia cursus. Vivamus a ligula a ante bibendum tempus a a quam. Suspendisse consectetur felis massa, laoreet posuere odio scelerisque sit amet. Curabitur in felis at ex sodales blandit id ",
                price: 1159,
            },
            {
                id: 3,
                image: "https://picsum.photos/id/512/300",
                title: "Fusce quis libero vel dui tincidunt ",
                destination: "Tokyo, Japan",
                shortDescription: "Proin non metus ut libero sollicitudin congue nec a ante.",
                longDescription: "Quisque non tristique sapien. Nulla facilisi. Cras ut eleifend dui, vel lacinia urna. Mauris ut tortor vel justo lacinia cursus. Vivamus a ligula a ante bibendum tempus a a quam.",
                price: 2149,
            },
            {
                id: 4,
                image: "https://picsum.photos/id/88/300",
                title: "Duis non lorem a risus vehicula vestibulum.",
                destination: "Barcelona, Spain",
                shortDescription: "Fusce malesuada odio sed elit volutpat, eu volutpat urna venenatis.",
                longDescription: "Aenean viverra eros vitae dui mattis, in facilisis libero euismod. Sed fringilla augue in dictum blandit. Quisque non tristique sapien. Nulla facilisi. Cras ut eleifend dui, vel lacinia urna. Mauris ut tortor vel justo ",
                price: 1350,
            },
            {
                id: 5,
                image: "https://picsum.photos/id/349/300",
                title: "Vivamus non urna quis erat sollicitudin facilisis id sed arcu.",
                destination: "Sydney, Australia",
                shortDescription: "In hac habitasse platea dictumst. Morbi non aliquet ex, ut facilisis mi.",
                longDescription: "Pellentesque eleifend odio nec bibendum. Praesent ut nunc ac elit ultrices venenatis vel ac lorem. Aenean viverra eros vitae dui mattis, in facilisis libero euismod. Sed fringilla augue in dictum blandit.",
                price: 1899,
            },
            {
                id: 6,
                image: "https://picsum.photos/id/49/300",
                title: "Fusce a tortor eu felis lacinia dapibus.",
                destination: "Cairo, Egypt",
                shortDescription: "Aenean rhoncus sapien sit amet tellus feugiat, at malesuada metus mattis.",
                longDescription: "Sed tristique quam vitae euismod. Sed convallis nunc nec odio interdum sollicitudin. Pellentesque eleifend odio nec bibendum. Praesent ut nunc ac elit ultrices venenatis vel ac lorem. Aenean viverra eros",
                price: 1550,
            },
            {
                id: 7,
                image: "https://picsum.photos/id/100/300",
                title: "In quis leo auctor, volutpat odio in, facilisis velit.",
                destination: "Rio de Janeiro, Brazil",
                shortDescription: "Aenean sit amet augue a quam rhoncus aliquam id ut est.",
                longDescription: "Nunc ac efficitur urna. Fusce feugiat enim a quam laoreet, id aliquam ex vestibulum. Sed tristique quam vitae euismod. Sed convallis nunc nec odio interdum sollicitudin. Pellentesque eleifend odio nec",
                price: 1450,
            },
        ];
    }
}
