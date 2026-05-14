import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyDcCukATzbTDNDoWsvXU8_DDOlWfMjdrr4')

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent('Say hello')
    console.log("Success:", result.response.text())
  } catch (error) {
    console.error("Flash failed:", error.message)
    try {
      const model2 = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' })
      const result2 = await model2.generateContent('Say hello')
      console.log("Pro success:", result2.response.text())
    } catch (e2) {
      console.error("Pro failed:", e2.message)
    }
  }
}
run()
