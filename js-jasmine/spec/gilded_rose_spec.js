var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });
  
  it("quality decreases by 1", function() { //Test case 2
    const gildedRose = new Shop([ new Item("foo", 1, 1) ]); //creates shop with item foo (sellIn = 1, quality = 1)
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0); //quality des ersten Items muss 0 sein (pass)
  });

  it("quality cannot be negative", function() { //Test case 3
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0); 
  });

  it("'Aged Brie' increases in quality", function() { //Test case 4
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });
  
  it("Quality of an item is never more than 50", function() { //Test case 5
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("'Sulfuras'never has to be sold or decreases in Quality", function() { //Test case 6
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(50);
  });

  it("'Backstage passes' increase in quality(by 2 when there are 10 days or less)", function() { //Test case 7
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 9, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(12);
  });

  it("'Backstage passes' increase in quality(by 3 when there are 5 days or less)", function() { //Test case 8
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
  });

  it("'Backstage passes' increase in quality(Quality drops to 0 after the concert)", function() { //Test case 9
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function() { //Test case 10
    const gildedRose = new Shop([ new Item("foo", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  it("'Sulfuras': its Quality is 80 and it never alters", function() { //Test case 11
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 1, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });

  it("'Conjured' items degrade in Quality twice as fast as normal items", function() { //Test case 12
    const gildedRose = new Shop([ new Item("Conjured Mana Cake", 1, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });
});