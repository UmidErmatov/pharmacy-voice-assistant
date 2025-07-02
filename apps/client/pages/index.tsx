import { useState } from 'react';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [medicines, setMedicines] = useState<any[]>([]);

  const startListening = () => {
    const rec = new (window as any).webkitSpeechRecognition();
    rec.lang = 'uz-UZ';
    rec.interimResults = false;
    rec.onresult = async (e: any) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);

      const aiRes = await fetch('http://localhost:4000/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const { args } = await aiRes.json();

      const q = await fetch('http://localhost:4000/drug/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
      });
      const list = await q.json();
      setMedicines(list);
    };
    rec.start();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Pharmacy Voice Assistant</h1>
      <button onClick={startListening}>🎙 Gapni ayting</button>
      <p><strong>Tanilgan matn:</strong> {transcript}</p>
      <h2>Topilgan dorilar:</h2>
      <ul>
        {medicines.map((m) => (
          <li key={m.id}>{m.name} – {m.quantity} dona – {m.price} UZS</li>
        ))}
      </ul>
    </div>
  );
}
