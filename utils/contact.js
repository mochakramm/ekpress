const fs= require('fs')


const dirPath = './data'
if( !fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

const dataPath ='./data/contacts.json'
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}
//tampilkan semua data contact
const loadContact = () => {
    const fileBufffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBufffer)
    return contacts
}

//cari detail contact berdasarkan nama 
const findContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact;
}

module.exports = { loadContact, findContact}