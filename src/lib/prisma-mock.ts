class MockDecimal {
  value: number;
  constructor(val: any) {
    this.value = Number(val);
  }
  mul(n: number) {
    return new MockDecimal(this.value * n);
  }
  toNumber() {
    return this.value;
  }
  toString() {
    return String(this.value);
  }
}

export class PrismaClient {
  constructor(options?: any) {}
  
  room = {
    count: async (args?: any): Promise<number> => 0,
    createMany: async (args?: any): Promise<any> => ({}),
    findUnique: async (args?: any): Promise<any> => ({
      id: "deluxe-king",
      slug: "deluxe-king",
      name: "Deluxe King Room",
      basePrice: new MockDecimal(195)
    }),
  };

  reservation = {
    findFirst: async (args?: any): Promise<any> => null,
    create: async (args?: any): Promise<any> => ({
      id: `ATH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      checkIn: new Date(),
      checkOut: new Date(),
      totalPrice: new MockDecimal(195),
      room: { name: "Deluxe King Room" },
      guest: {
        firstName: "Mock",
        lastName: "Guest",
        email: "mock@guest.com",
        tier: "CLASSIC",
        preferences: {
          pillowType: "Feather",
          roomTemperature: 22,
          dietaryNotes: "",
          transferMode: "NONE"
        }
      },
      ...args?.data
    }),
    findUnique: async (args?: any): Promise<any> => null,
  };

  guest = {
    findUnique: async (args?: any): Promise<any> => null,
    create: async (args?: any): Promise<any> => ({
      id: 'mock-guest-id',
      ...args?.data
    }),
    update: async (args?: any): Promise<any> => ({}),
  };

  preference = {
    update: async (args?: any): Promise<any> => ({}),
  };

  impactMetric = {
    count: async (args?: any): Promise<number> => 0,
    createMany: async (args?: any): Promise<any> => ({}),
    create: async (args?: any): Promise<any> => ({}),
    findFirst: async (args?: any): Promise<any> => null,
  };

  $transaction = async (fn: any) => fn(this);
}
export default PrismaClient;
