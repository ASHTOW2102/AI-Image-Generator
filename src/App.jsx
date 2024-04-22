import React, { useState } from 'react';
import { Button, Container, CssBaseline, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme();

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const ACCESS_KEY = 'mlliKRBp_8aY4pq0VJl7wOnlxivkR29tKcwI-fip7AQ'; 
  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${prompt}&client_id=${ACCESS_KEY}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.urls.regular);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className="App">
          <h1>AI Image Generator</h1>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="prompt"
              label="Enter your prompt here..."
              name="prompt"
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGenerateImage}
              disabled={isLoading}
              
            >
              {isLoading ? 'Generating Image...' : 'Generate Image'}
            </Button>
          </div>
          <div>
            {imageUrl && (
              <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', marginTop: '20px' }} />
            )}
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
