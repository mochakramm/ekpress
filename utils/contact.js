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

//menuliskan atau menimpa file contact.json dengan data yang baru
const saveContact = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

//menambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContact(contacts)
}

//cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama )
}

module.exports = { loadContact, findContact, addContact, cekDuplikat}