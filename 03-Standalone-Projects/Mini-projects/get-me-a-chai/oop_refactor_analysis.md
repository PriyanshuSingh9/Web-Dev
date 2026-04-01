# OOP Refactor Analysis: Get Me A Chai

This document explores how the **Get Me A Chai** project would be architected if it strictly followed Object-Oriented Programming (OOP) principles.

---

## 1. Payment Processing (The Strategy Pattern)
Decoupling the payment logic from a specific provider (Cashfree).

### Original Code (`actions/paymentActions.ts`)
```typescript
import { Cashfree, CFEnvironment } from "cashfree-pg";

export async function intializePayments(amount: number, to_username: string, donor: userType, message: string) {
    const cashfree = new Cashfree(
        CFEnvironment.SANDBOX, 
        recipient.cashfreeClientId, 
        recipient.cashfreeClientSecret
    );
    const response = await cashfree.PGCreateOrder(request);
    // ... logic tightly coupled to Cashfree SDK
}
```

### OOP Way
```typescript
interface IPaymentGateway {
    createOrder(amount: number, donor: User, message: string): Promise<string>;
    verifyPayment(orderId: string): Promise<boolean>;
}

class CashfreeGateway implements IPaymentGateway {
    async createOrder(amount: number, donor: User, message: string) {
        // Cashfree-specific implementation logic
    }
    async verifyPayment(orderId: string) { /* ... */ }
}

class PaymentService {
    constructor(private gateway: IPaymentGateway) {}
    
    async processDonation(amount: number, donor: User) {
        return this.gateway.createOrder(amount, donor, "Support");
    }
}
```

### Logic
By defining an `IPaymentGateway` interface, the `PaymentService` becomes provider-agnostic. It doesn't care if you use Cashfree, Stripe, or Razorpay, as long as the object passed to it implements the required methods.

### Which is Better?
**OOP.** It makes the system **extensible**. You can add new payment methods by simply adding a new class without modifying existing business logic.

---

## 2. Data Access (The Repository Pattern)
Decoupling the application logic from Mongoose/MongoDB.

### Original Code (`app/dashboard/page.tsx`)
```typescript
// Direct dependency on the Mongoose model
await connectDB()
const userDoc = await User.findOne({ email: session.user?.email }).lean()
```

### OOP Way
```typescript
class UserRepository {
    async findByEmail(email: string): Promise<UserEntity | null> {
        const doc = await User.findOne({ email }).lean();
        return doc ? new UserEntity(doc) : null;
    }

    async updateProfile(id: string, updates: Partial<UserEntity>) {
        return User.findByIdAndUpdate(id, updates);
    }
}

// In the component/action:
const userRepo = new UserRepository();
const user = await userRepo.findByEmail(session.user.email);
```

### Logic
The `UserRepository` acts as a mediator. The rest of the application interacts with a generic "Repository" rather than a specific database driver. This follows the **Dependency Inversion Principle**.

### Which is Better?
**OOP.** Essential for the planned **v2 migration** to PostgreSQL. It allows you to swap the entire database layer by just creating a `PostgresUserRepository` that implements the same interface.

---

## 3. Domain Logic (Rich Entities)
Moving logic from utility functions into the objects themselves.

### Original Code (`actions/paymentActions.ts`)
```typescript
// Logic scattered in server actions
if (!recipient.cashfreeClientId || !recipient.cashfreeClientSecret) {
    throw new Error("User does not have cashfree configured")
}
```

### OOP Way
```typescript
class UserEntity {
    constructor(private data: userType) {}

    public canReceivePayments(): boolean {
        return !!(this.data.cashfreeClientId && this.data.cashfreeClientSecret);
    }

    public getDisplayName(): string {
        return this.data.name || this.data.username;
    }
}

// Usage
if (!userEntity.canReceivePayments()) throw new Error("...");
```

### Logic
Instead of "Anemic Domain Models" (objects that are just data bags), we create "Rich Domain Models" where the data and the rules governing that data live together.

### Which is Better?
**Functional (Original).** For a small-scale project, creating complex entity classes for every data type adds unnecessary boilerplate. The current TypeScript interfaces are sufficient.

---

## 4. Resource Management (The Singleton Pattern)
Managing the database connection lifecycle.

### Original Code (`lib/db.ts`)
```typescript
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB Connected");
    } catch (error) { /* ... */ }
};
```

### OOP Way
```typescript
class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connected: boolean = false;

    private constructor() {}

    public static getInstance(): DatabaseConnection {
        if (!this.instance) this.instance = new DatabaseConnection();
        return this.instance;
    }

    public async connect() {
        if (this.connected) return;
        await mongoose.connect(process.env.MONGODB_URI!);
        this.connected = true;
    }
}
```

### Logic
The `Singleton` pattern ensures that only one instance of the connection manager exists across the entire application lifecycle, preventing accidental multiple connections.

### Which is Better?
**Functional (Original).** Next.js and Node.js module caching already ensure that variables in a file behave like singletons. The OOP wrapper adds a layer of "Ceremony" without real functional gain in this environment.

---

## Final Verdict

| Feature | Current (Functional) | OOP Refactor | Recommendation |
| :--- | :--- | :--- | :--- |
| **Maintainability** | High for small teams. | High for large enterprise teams. | **Current** |
| **Testability** | Moderate (uses globals). | High (uses Dependency Injection). | **OOP** |
| **Flexibility** | Low (tightly coupled). | High (interface-based). | **OOP** |
| **Development Speed** | Very Fast. | Slower (more setup). | **Current** |

**Conclusion:** For a prototype/v1, the current **Functional/Procedural** style is perfect. If the project scales to support multiple databases and payment providers, an **OOP refactor** of the Service and Repository layers would be the logical next step.
