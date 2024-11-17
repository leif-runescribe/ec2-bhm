import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Shield, 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Radio 
} from 'lucide-react';

const BlockchainDashboard = () => {
  const [metrics, setMetrics] = useState({
    transactionThroughput: 0,
    consensusHealth: 0,
    securityLevel: 0,
    activeNodes: 0
  });
  
  const [transactions, setTransactions] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        transactionThroughput: Math.min(1000, Math.max(0, prev.transactionThroughput + (Math.random() - 0.5) * 50)),
        consensusHealth: Math.min(100, Math.max(0, prev.consensusHealth + (Math.random() - 0.5) * 10)),
        securityLevel: Math.min(100, Math.max(0, prev.securityLevel + (Math.random() - 0.5) * 5)),
        activeNodes: Math.floor(Math.random() * 50) + 50
      }));
      
      // Simulate incoming transactions
      if (Math.random() > 0.7) {
        const newTransaction = {
          id: Date.now(),
          hash: `0x${Math.random().toString(16).slice(2, 10)}`,
          sender: `0x${Math.random().toString(16).slice(2, 8)}`,
          recipient: `0x${Math.random().toString(16).slice(2, 8)}`,
          amount: (Math.random() * 10).toFixed(2),
        };
        setTransactions(prev => [newTransaction, ...prev].slice(0, 5));
      }
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  // Generate random nodes for the visualization
  const nodes = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    role: i % 3 === 0 ? 'Miner' : i % 3 === 1 ? 'Validator' : 'Full Node',
    status: Math.random() > 0.8 ? 'compromised' : 'healthy',
    uptime: `${(Math.random() * 100).toFixed(1)}%`,
    load: Math.random() * 100
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Blockchain Network Health Dashboard</h1>
        <p className="text-gray-400">Monitor the performance, security, and consensus health of the blockchain network.</p>
      </header>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Transaction Throughput</p>
          <h3 className="text-2xl font-bold">{metrics.transactionThroughput.toFixed(1)} TPS</h3>
          <Activity className="text-green-400 mt-2" />
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Consensus Health</p>
          <h3 className="text-2xl font-bold">{metrics.consensusHealth.toFixed(1)}%</h3>
          <CheckCircle className="text-blue-400 mt-2" />
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Security Level</p>
          <h3 className="text-2xl font-bold">{metrics.securityLevel.toFixed(1)}%</h3>
          <Shield className="text-purple-400 mt-2" />
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Active Nodes</p>
          <h3 className="text-2xl font-bold">{metrics.activeNodes}</h3>
          <Server className="text-orange-400 mt-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Visualization */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Node Health</h2>
          <div className="grid grid-cols-6 gap-4">
            {nodes.map(node => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`aspect-square rounded-lg relative cursor-pointer
                  ${node.status === 'compromised' ? 'bg-red-500/20' : 'bg-blue-500/20'}
                  hover:bg-opacity-30 transition-all duration-300
                  ${selectedNode?.id === node.id ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Radio className={`w-6 h-6 ${node.status === 'compromised' ? 'text-red-400' : 'text-blue-400'}`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-300">
                  {node.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map(tx => (
              <div key={tx.id} className="p-4 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-300"><strong>Hash:</strong> {tx.hash}</p>
                <p className="text-sm text-gray-300"><strong>Sender:</strong> {tx.sender}</p>
                <p className="text-sm text-gray-300"><strong>Recipient:</strong> {tx.recipient}</p>
                <p className="text-sm text-gray-300"><strong>Amount:</strong> {tx.amount} ETH</p>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-gray-400 text-center">No recent transactions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainDashboard;
