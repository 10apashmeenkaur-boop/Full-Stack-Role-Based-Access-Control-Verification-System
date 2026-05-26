import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const XML_FILE = './database.xml';

let users = [
  { id: 'admin', name: 'System Admin', role: 'Admin', status: 'Active' },
  { id: '101', name: 'Sarah Connor', role: 'General User', status: 'Active' },
  { id: '102', name: 'Michael Chang', role: 'General User', status: 'Active' }
];

let records = [
  { id: 'REC-01', title: 'OAuth 2.0 Integration', description: 'Implement SSO.', status: 'Completed', priority: 'High', assignedTo: 'Security Team', date: 'May 10, 2026' },
  { id: 'REC-02', title: 'PostgreSQL Migration', description: 'Migrate DB.', status: 'Active', priority: 'High', assignedTo: 'Database Team', date: 'May 21, 2026' },
  { id: 'REC-03', title: 'Redis Cache Implementation', description: 'Add cache.', status: 'Completed', priority: 'Medium', assignedTo: 'Backend Team', date: 'May 12, 2026' },
  { id: 'REC-04', title: 'Kubernetes Cluster', description: 'Configure pods.', status: 'Active', priority: 'High', assignedTo: 'DevOps Team', date: 'May 23, 2026' },
  { id: 'REC-05', title: 'Unit Test Coverage', description: 'Increase coverage.', status: 'Pending', priority: 'Low', assignedTo: 'QA Team', date: 'May 25, 2026' },
  { id: 'REC-06', title: 'Admin Audit Log', description: 'Sensitive data.', status: 'Active', priority: 'High', assignedTo: 'Admin', date: 'May 26, 2026' },
  { id: 'REC-07', title: 'Billing System', description: 'Financial update.', status: 'Pending', priority: 'High', assignedTo: 'Admin', date: 'May 27, 2026' }
];

function syncToLocalXML() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<database>\n  <users>\n';
  users.forEach(u => { xml += `    <user>\n      <id>${u.id}</id>\n      <name>${u.name}</name>\n      <role>${u.role}</role>\n      <status>${u.status}</status>\n    </user>\n`; });
  xml += '  </users>\n\n  <records>\n';
  records.forEach(r => { xml += `    <record>\n      <id>${r.id}</id>\n      <title>${r.title}</title>\n      <description>${r.description}</description>\n      <status>${r.status}</status>\n      <priority>${r.priority}</priority>\n      <assignedTo>${r.assignedTo}</assignedTo>\n      <date>${r.date}</date>\n    </record>\n`; });
  xml += '  </records>\n</database>';
  fs.writeFileSync(XML_FILE, xml);
}
syncToLocalXML();

app.post('/api/login', (req, res) => {
  console.log('--- NEW LOGIN ATTEMPT ---');
  
  // 1. Force absolutely everything to lowercase and remove spaces
  const inputId = (req.body.userId || '').trim().toLowerCase();
  const inputRole = (req.body.role || '').trim().toLowerCase();
  
  console.log(`Frontend sent -> ID: "${inputId}" | Role: "${inputRole}"`);

  // 2. Compare against database using lowercase for everything
  const user = users.find(u => u.id.toLowerCase() === inputId && u.role.toLowerCase() === inputRole);
  
  if (user) { 
    console.log('SUCCESS! Let them in.');
    res.json({ user }); 
  } else { 
    console.log('FAILED MATCH. Look at the strings above to see why.');
    res.status(401).json({ message: 'Invalid ID, Password, or Role mismatch' }); 
  }
});

app.get('/api/users', (req, res) => { res.json(users); });
app.post('/api/users', (req, res) => {
  const newUser = { id: req.body.id, name: req.body.name, role: req.body.role, status: 'Active' };
  users.push(newUser); syncToLocalXML(); res.json(newUser);
});
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) { users[index] = { ...users[index], name: req.body.name, role: req.body.role }; syncToLocalXML(); res.json(users[index]); } 
  else { res.status(404).send('Not found'); }
});
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== req.params.id); syncToLocalXML(); res.json({ message: 'Deleted' });
});

app.get('/api/records', (req, res) => {
  const delay = parseInt(req.query.delay as string) || 0;
  const userRole = req.query.role;
  setTimeout(() => {
    if (userRole === 'Admin') { res.json(records); } else { res.json(records.slice(0, 5)); }
  }, delay);
});

app.listen(3000, () => console.log('Backend running on port 3000.'));