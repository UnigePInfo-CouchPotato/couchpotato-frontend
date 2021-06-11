export class TwoWayMap {
  private map: { [key: string]: number };
  private reverseMap: { [key: number]: string };

  constructor(map: { [key: string]: number }) {
    this.map = map;
    this.reverseMap = {};
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        const value = map[key];
        this.reverseMap[value] = key;
      }
    }
  }

  get(key: string) { return this.map[key]; }
  rget(key: number) { return this.reverseMap[key]; }
}
