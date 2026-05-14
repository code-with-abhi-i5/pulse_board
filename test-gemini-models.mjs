import { GoogleGenerativeAI } from '@google/generative-ai'
import fetch from 'node-fetch' // we'll use native fetch

async function run() {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDcCukATzbTDNDoWsvXU8_DDOlWfMjdrr4')
    const data = await res.json()
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(error)
  }
}
run()
