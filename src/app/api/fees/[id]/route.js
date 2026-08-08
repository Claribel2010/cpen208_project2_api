import pool from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await pool.query('SELECT get_outstanding_fees() AS data');
    const allFees = result.rows[0].data || [];
    const studentFees = allFees.find((f) => f.student_id === id);

    if (!studentFees) {
      return Response.json({ success: false, error: 'No fee record found for this student.' }, { status: 404 });
    }

    return Response.json({ success: true, fees: studentFees });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}