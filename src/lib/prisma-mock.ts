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
    count: async () => 0,
    createMany: async () => ({}),
    findUnique: async () => ({
      id: "deluxe-king",
      slug: "deluxe-king",
      name: "Deluxe King Room",
      basePrice: new MockDecimal(195)
    }),
  };

  reservation = {
    findFirst: async () => null,
    create: async (args: any) => ({
      id: `ATH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...args.data
    }),
    findUnique: async () => null,
  };

  guest = {
    findUnique: async () => null,
    create: async (args: any) => ({
      id: 'mock-guest-id',
      ...args.data
    }),
  };

  preference = {
    update: async () => ({}),
  };

  impactMetric = {
    count: async () => 0,
    createMany: async () => ({}),
    create: async () => ({}),
    findFirst: async () => null,
  };

  $transaction = async (fn: any) => fn(this);
}
export default PrismaClient;
