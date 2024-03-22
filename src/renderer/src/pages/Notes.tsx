import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require( "electron" );

const Notes = () => {
  const [readme, setReadme] = useState('');

  useEffect(() => {
    async function fetchFileContent() {
      const content = await ipcRenderer.invoke('read-file', './README.md');
      setReadme(content);
    }

    fetchFileContent();
  }, []);

  return (
    <div>
      <h1>Note</h1>
      <p>{readme}</p>
    </div>
  );
};

export default Notes;