import React, { useState } from 'react';

export default function EventFeed() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !datetime) return;

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      datetime: datetime, // ISO string like "2025-11-25T14:30"
    };

    setEvents((prev) => [newEvent, ...prev]); // добавляем в начало
    setTitle('');
    setDatetime('');
  };

  // Форматирование даты и времени для отображения
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>📅 Лента событий</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Название события"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Добавить событие
        </button>
      </form>

      <div>
        <h3>События:</h3>
        {events.length === 0 ? (
          <p>Нет добавленных событий.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {events.map((event) => (
              <li
                key={event.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <strong>{event.title}</strong>
                <br />
                <small>{formatDateTime(event.datetime)}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
