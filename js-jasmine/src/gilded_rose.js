class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      this.updateItemQuality(item); //At the end of each day our system lowers both values for every item
      this.updateItemSellIn(item); //--,,--
      if (item.sellIn < 0) { //Once the sell by date has passed, Quality degrades twice as fast
        this.handleExpiredItem(item);
      }
    });
    return this.items;
  }

  updateItemQuality(item) {
    if (item.name === 'Sulfuras, Hand of Ragnaros') return; //"Sulfuras", never has to be sold or decreases in Quality
    let factor = item.name === 'Conjured Mana Cake' ? 2 : 1; //Conjured items degrade in Quality twice as fast as normal items
    
    if (item.name === 'Aged Brie') { //Aged Brie increases in Quality the older it gets
      this.increaseQuality(item, 1);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') { //special rules
      this.updateBackstagePassQuality(item);
    } else {
      this.decreaseQuality(item, factor);
    }
  }

  updateItemSellIn(item) {
    if (item.name !== 'Sulfuras, Hand of Ragnaros') { //"Sulfuras", never has to decreases in Quality
      item.sellIn -= 1;
    }
  }

  handleExpiredItem(item) {
    if (item.name === 'Aged Brie') { //Aged Brie increases in Quality the older it gets
      this.increaseQuality(item, 1);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') { //Quality drops to 0 after the concert
      item.quality = 0;
    } else {
      this.decreaseQuality(item, item.name === 'Conjured Mana Cake' ? 2 : 1); //Conjured items degrade in Quality twice as fast as normal items
    }
  }
  
  updateBackstagePassQuality(item) { 
    this.increaseQuality(item, 1);
    if (item.sellIn <= 10) this.increaseQuality(item, 1); //Quality increases by 2 when there are 10 days or less
    if (item.sellIn <= 5) this.increaseQuality(item, 1); //Quality increases by 3 when there are 5 days or less but
  }

  increaseQuality(item, amount) { //increase quality by amount, but not above 50
    if (item.quality < 50) {
      item.quality = Math.min(item.quality + amount, 50); //Quality of an item is never more than 50
    }
  }

  decreaseQuality(item, amount) { //decrease quality by amount, but not below 0
    if (item.quality > 0) {
      item.quality = Math.max(item.quality - amount, 0); //Quality of an item is never negative
    }
  }
}
module.exports = {
  Item,
  Shop
}
