import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnect = () => {
  const { connect, disconnect, connected, publicKey } = useWallet();
  const [userStatus, setUserStatus] = useState(''); // To show registration status

  // Function to check and register wallet
  const handleWalletConnection = async (address) => {
    try {
      // Check if user exists
      const checkResponse = await fetch(`http://localhost:5001/walletUser/${address}`);
      
      if (checkResponse.status === 404) {
        // User doesn't exist, register them
        const registerResponse = await fetch('http://localhost:5001/walletUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address }),
        });

        if (registerResponse.ok) {
          setUserStatus('New user registered successfully!');
        } else {
          setUserStatus('Failed to register user');
        }
      } else if (checkResponse.ok) {
        setUserStatus('Welcome back!');
      }
    } catch (error) {
      console.error('Error handling wallet connection:', error);
      setUserStatus('Error connecting wallet');
    }
  };

  // Effect to handle address registration when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      console.log(connected, publicKey);
      handleWalletConnection(publicKey.toString());
    }
  }, [connected, publicKey]);

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected to wallet: {publicKey?.toString()}1111</p>
          <p>{userStatus}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={() => connect()}>Connect Wallet</button>
          {userStatus && <p>{userStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;