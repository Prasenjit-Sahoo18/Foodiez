import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: "Unauthorized. Please login to book a table." },
            { status: 401 }
        );
    }

    try {
        const { name, guests, phone, date, time } = await req.json();

        if (!name || !guests || !phone || !date || !time) {
            return NextResponse.json(
                { error: "All fields are required to reserve a table." },
                { status: 400 }
            );
        }

        const table = await prisma.table.create({
            data: {
                userId: session.user.id,
                guests: Number(guests),
                name,
                phone: Number(phone),
                date,
                time
            }
        });
        return NextResponse.json(table, { status: 201 });
    } catch (e) {
        console.error("Booking error:", e);
        return NextResponse.json({ error: `Failed to book table: ${e}` }, { status: 500 });
    }
}

// Get table booking data
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    if (session.user.email === "admin@gmail.com") {
        try {
            const bookings = await prisma.table.findMany({
                orderBy: {
                    createdAt: "desc"
                }
            });
            return NextResponse.json(bookings);
        } catch {
            return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
        }
    }

    try {
        const bookings = await prisma.table.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                userId: session.user.id
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch bookings: ${error}` }, { status: 500 });
    }
}
