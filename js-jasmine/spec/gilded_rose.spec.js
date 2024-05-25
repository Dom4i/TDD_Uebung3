var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("fixme");
  });
  
  
  it("quality decreases by 1", function() { //Test case 2
    const gildedRose = new Shop([ new Item("foo", 1, 1) ]); //creates shop with item foo (sellIn = 1, quality = 1)
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0); //quality des ersten Items muss 0 sein (pass)
  });
  
});