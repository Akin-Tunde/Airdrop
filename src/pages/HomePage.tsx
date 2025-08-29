// src/pages/HomePage.tsx (Final, Type-Inferred Version)

import { useState, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { formatUnits } from 'viem';
import { Link } from 'react-router-dom';

import { raindropContractAddress } from '../contracts/info'; 
import './HomePage.css';

// Define the event ABI once as a constant for type safety and reusability.
const raindropCreatedEvent = {
  type: 'event',
  name: 'RaindropCreated',
  inputs: [
    { type: 'string', name: 'raindropId', indexed: true },
    { type: 'address', name: 'host', indexed: true },
    { type: 'address', name: 'token', indexed: true },
    { type: 'uint256', name: 'totalAmount' },
    { type: 'uint256', name: 'scheduledTime' },
  ],
} as const; // The 'as const' is crucial for strict type inference

export function HomePage() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();

  // Let's create a more specific type for our raindrops based on the ABI
  type RaindropLog = {
    args: {
      raindropId?: string;
      token?: `0x${string}`;
      totalAmount?: bigint;
    }
  };

  const [raindrops, setRaindrops] = useState<RaindropLog['args'][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRaindrops = async () => {
      if (!publicClient || !address) return;

      setIsLoading(true);
      setError('');
      setRaindrops([]);

      try {
        const contractDeploymentBlock = 16139986n;
        const latestBlock = await publicClient.getBlockNumber();
        const chunkSize = 499n;

        // FIX: Initialize 'allLogs' without an explicit type.
        // TypeScript will infer its type on the first `push`.
        let allLogs = [];

        for (let fromBlock = contractDeploymentBlock; fromBlock <= latestBlock; fromBlock += chunkSize) {
          const toBlock = fromBlock + chunkSize - 1n < latestBlock ? fromBlock + chunkSize - 1n : latestBlock;
          
          console.log(`Fetching logs from block ${fromBlock} to ${toBlock}`);

          const logs = await publicClient.getLogs({
            address: raindropContractAddress,
            event: raindropCreatedEvent, // Use the constant ABI
            args: {
              host: address,
            },
            fromBlock: fromBlock,
            toBlock: toBlock,
          });
          
          // When we push the 'logs' array, 'allLogs' becomes an array of the correct, specific log type.
          allLogs.push(...logs);
        }

        // Now, 'log.args' exists because TypeScript correctly inferred the type.
        const userRaindrops = allLogs.map((log) => log.args);
        setRaindrops(userRaindrops);

      } catch (e) {
        console.error("Error fetching raindrops:", e);
        setError("Failed to fetch raindrops. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaindrops();
  }, [address, publicClient]);

  if (!isConnected) {
    return <p>Please connect your wallet to see your dashboard.</p>;
  }

  if (isLoading) {
    return <p>Loading your raindrops... This may take a moment.</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <div className="dashboardHeader">
        <h2>My Raindrops Dashboard</h2>
        <Link to="/create" className="createButton">Create New Raindrop</Link>
      </div>
      {raindrops.length === 0 ? (
        <p>You haven't created any raindrops yet.</p>
      ) : (
        <table className="raindropsTable">
          <thead>
            <tr>
              <th>Raindrop ID</th>
              <th>Token Address</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {raindrops.map((raindrop, index) => (
              <tr key={`${raindrop.raindropId}-${index}`}>
                <td>
                  <Link to={`/raindrop/${raindrop.raindropId}`}>
                    {raindrop.raindropId}
                  </Link>
                </td>
                <td>{raindrop.token}</td>
                <td>{raindrop.totalAmount ? formatUnits(raindrop.totalAmount, 18) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}