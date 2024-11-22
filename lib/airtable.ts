import Airtable from 'airtable';

if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
  throw new Error('Missing Airtable environment variables');
}

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(
  process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
);

export const createContentRecord = async (data: ContentPlan) => {
  try {
    const record = await base('tbl8KydHV6Mm1vTOE').create([
      {
        fields: {
          'fld5stKnhUD3bnqMb': data.contentFormat,    // Content Format
          'fldhOnvBtVVET0PY5': data.contentGoal,      // Content Goal
          'fldWHcQCLA0IpXTcS': data.startDate,        // Start Date
          'fldkCLgTAIn9f8kUU': data.endDate,          // End Date
          'fldXgYfOSfVhtkP8K': 'Todo',                // Status
          'fldt6kDu6loBkTRW3': data.notes             // Notes
        },
      },
    ], { typecast: true });

    return record;
  } catch (error) {
    console.error('Error creating Airtable record:', error);
    throw error;
  }
};

export type ContentPlan = {
  contentFormat: 'Video' | 'Audio';
  contentGoal: 'Engagement' | 'Recruiting' | 'Information';
  startDate: string;
  endDate: string;
  notes: string;
};

// Validation constants based on Airtable documentation
export const VALID_CONTENT_FORMATS = ['Video', 'Audio'] as const;
export const VALID_CONTENT_GOALS = ['Engagement', 'Recruiting', 'Information'] as const;
export const VALID_STATUS = ['Todo', 'In progress', 'Done'] as const;