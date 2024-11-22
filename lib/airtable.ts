import Airtable from 'airtable';

if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
  throw new Error('Missing Airtable environment variables');
}

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(
  process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
);

export const createContentRecord = async (data: ContentPlan) => {
  try {
    const record = await base('Denise\'s content list').create([
      {
        fields: {
          'fld5stKnhUD3bnqMb': data.contentFormat,
          'fldhOnvBtVVET0PY5': data.contentGoal,
          'fldWHcQCLA0IpXTcS': data.startDate,
          'fldkCLgTAIn9f8kUU': data.endDate,
          'fldXgYfOSfVhtkP8K': 'Todo', // Default status for new records
        },
      },
    ], { typecast: true }); // Enable typecast to handle single select options

    return record;
  } catch (error) {
    console.error('Error creating Airtable record:', error);
    throw error;
  }
};

export type ContentPlan = {
  contentFormat: 'Video' | 'Image' | 'Article' | 'Audio';
  contentGoal: 'Engagement' | 'Recruiting' | 'Promotion' | 'Information';
  startDate: string;
  endDate: string;
};