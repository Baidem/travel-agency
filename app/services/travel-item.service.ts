import { TravelItem } from "../models/travel-item.model";

class travelItemService {
    private travelItems: TravelItem[];
    constructor() {
        this.travelItems = TravelItem.generateFakeData();
    }
    getAll(): TravelItem[] {
        console.log("Check ! travel-item.service.ts getAll()");
        return this.travelItems;
    }

    getById(id: number): TravelItem | undefined {
        console.log("Check ! travel-item.service.ts getById(id)", id);
        return this.travelItems.find((tI) => tI.id === id);
    }

    insert(newItem: TravelItem): void {
        console.log("Check ! travel-item.service.ts insert(newItem)", newItem.id);
        this.travelItems.push(newItem);
    }

    update(itemEdited: TravelItem): void {
        console.log("Check ! travel-item.service.ts update(itemEdited)", itemEdited.id);
        const index = this.travelItems.findIndex((tI) => tI.id === itemEdited.id);
        if (index < 0) throw "The id does not correspond to any item";
        this.travelItems[index] = itemEdited;
    }

    delete(id: number): void {
        console.log("Check ! travel-item.service.ts delete(id)", id);
        this.travelItems = this.travelItems.filter((tI) => tI.id !== id);
    }
}

// export singleton
export default new travelItemService();
