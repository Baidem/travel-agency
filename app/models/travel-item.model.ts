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
            image: "https://picsum.photos/200",
            title: "Lorem ipsum dolor sit amet.",
            destination: "Sed egestas",
            shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas.",
            longDescription:
            "Suspendisse consectetur felis massa, laoreet posuere odio scelerisque sit amet. Curabitur in felis at ex sodales blandit id quis elit. Pellentesque tempor orci ut nibh maximus tempus. Donec non vestibulum eros, non tincidunt mauris. Donec et consequat ligula, nec imperdiet ligula. Curabitur dignissim sapien lacinia, maximus sapien non, pulvinar purus. Praesent vitae massa ut nibh sodales accumsan. Nam hendrerit dictum metus, viverra dignissim elit aliquet eget. Curabitur est justo, fringilla sed gravida at, interdum eu nisl. Donec luctus nisl volutpat cursus eleifend.",
            price: 1149,
        },
        {
            id: 2,
            image: "https://picsum.photos/200",
            title: "Lorem ipsum dolor sit amet.",
            destination: "Sed egestas",
            shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas.",
            longDescription:
            "Suspendisse consectetur felis massa, laoreet posuere odio scelerisque sit amet. Curabitur in felis at ex sodales blandit id quis elit. Pellentesque tempor orci ut nibh maximus tempus. Donec non vestibulum eros, non tincidunt mauris. Donec et consequat ligula, nec imperdiet ligula. Curabitur dignissim sapien lacinia, maximus sapien non, pulvinar purus. Praesent vitae massa ut nibh sodales accumsan. Nam hendrerit dictum metus, viverra dignissim elit aliquet eget. Curabitur est justo, fringilla sed gravida at, interdum eu nisl. Donec luctus nisl volutpat cursus eleifend.",
            price: 1149,
        },
        {
            id: 3,
            image: "https://picsum.photos/200",
            title: "Lorem ipsum dolor sit amet.",
            destination: "Sed egestas",
            shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas.",
            longDescription:
            "Suspendisse consectetur felis massa, laoreet posuere odio scelerisque sit amet. Curabitur in felis at ex sodales blandit id quis elit. Pellentesque tempor orci ut nibh maximus tempus. Donec non vestibulum eros, non tincidunt mauris. Donec et consequat ligula, nec imperdiet ligula. Curabitur dignissim sapien lacinia, maximus sapien non, pulvinar purus. Praesent vitae massa ut nibh sodales accumsan. Nam hendrerit dictum metus, viverra dignissim elit aliquet eget. Curabitur est justo, fringilla sed gravida at, interdum eu nisl. Donec luctus nisl volutpat cursus eleifend.",
            price: 1149,
        },
        ];
    }
}
