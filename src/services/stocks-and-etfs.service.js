import Company from '../models/company.model.js';

async function getCompaniesByEquityType({ equityType, page, pageSize }) {
  const query = { equityType };
  const [count, data] = await Promise.all([
    Company.count(query),
    Company.find(query)
      .sort({ name: 1 })
      .skip(page * pageSize)
      .limit(pageSize),
  ]);

  return { count, data };
}

export default { getCompaniesByEquityType };
