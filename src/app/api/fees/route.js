import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT get_outstanding_fees() AS data');
    const fees = result.rows[0].data || [];
    return Response.json({ success: true, count: fees.length, fees });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}