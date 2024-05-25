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
  
});