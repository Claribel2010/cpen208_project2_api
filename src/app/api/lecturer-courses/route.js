import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT lc.id, l.lecturer_id, l.first_name || ' ' || l.last_name AS lecturer_name,
              c.course_id, c.course_title, lc.semester
       FROM lecturer_course lc
       JOIN lecturer l ON l.lecturer_id = lc.lecturer_id
       JOIN course c ON c.course_id = lc.course_id
       ORDER BY lc.semester, c.course_id`
    );
    return Response.json({ success: true, count: result.rows.length, assignments: result.rows });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}