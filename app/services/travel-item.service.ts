import { TravelItem } from "../models/travel-item.model";

class travelItemService {
    private travelItems: TravelItem[];
    constructor() {
        this.travelItems = TravelItem.generateFakeData();
    }
    getAll(): TravelItem[] {
        return this.travelItems;
    }

    getById(id: number): TravelItem | undefined {
        return this.travelItems.find((tI) => tI.id === id);
    }

    insert(newItem: TravelItem): void {
        this.travelItems.push(newItem);
    }

    update(itemEdited: TravelItem): void {
        const index = this.travelItems.findIndex((tI) => tI.id === itemEdited.id);
        if (index < 0) throw "The id does not correspond to any item";
        this.travelItems[index] = itemEdited;
    }

    delete(id: number): void {
        this.travelItems = this.travelItems.filter((tI) => tI.id !== id);
    }
}

// export singleton
export default new travelItemService();
