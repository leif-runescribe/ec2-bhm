import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  Waves,
  Shield,
  Zap,
  Server,
  Globe,
  AlertTriangle,
  FileText,
  Radio
} from 'lucide-react';

const BlockchainHealthDashboard = () => {
  const [metrics, setMetrics] = useState({
    nodeHealth: 'healthy',
    transactionVolume: 0,
    blockTime: 10,
    syncStatus: 'synchronized',
    gasFees: 0.05,
    confirmationRate: 0.99,
    nodeCount: 50,
    peerCount: 0,
    hashRate: 2000000,
    latestBlockHeight: 1024,
    nodes: [],  // Added to track node data
  });

  const [alerts, setAlerts] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate data changes for metrics and node health
      const newNodes = Array.from({ length: metrics.nodeCount }, (_, idx) => ({
        id: idx + 1,
        status: Math.random() > 0.2 ? 'Healthy' : 'Offline',  // Random node health
        syncStatus: Math.random() > 0.1 ? 'Synchronized' : 'Behind',
        peers: Math.floor(Math.random() * 30) + 5,
        cpuUsage: (Math.random() * 100).toFixed(1),
        memoryUsage: (Math.random() * 100).toFixed(1),
      }));

      setMetrics(prev => ({
        ...prev,
        transactionVolume: Math.floor(Math.random() * 100) + 20,
        blockTime: Math.max(8, prev.blockTime + (Math.random() - 0.5) * 2),
        gasFees: (Math.random() * 0.1).toFixed(2),
        confirmationRate: Math.min(1, Math.max(0, prev.confirmationRate + (Math.random() - 0.5) * 0.05)),
        nodeCount: Math.floor(Math.random() * 30) + 50,
        peerCount: Math.floor(Math.random() * 10) + 10,
        hashRate: Math.floor(Math.random() * 5000000) + 1000000,
        latestBlockHeight: prev.latestBlockHeight + 1,
        nodes: newNodes,
      }));

      if (Math.random() > 0.95) {
        const newAlert = {
          id: Date.now(),
          message: `Potential fork detected at block ${metrics.latestBlockHeight}`,
          level: 'critical'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [metrics.latestBlockHeight]);

  const nodes = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    role: i % 3 === 0 ? 'Miner' : i % 3 === 1 ? 'Validator' : 'Full Node',
    status: Math.random() > 0.8 ? 'compromised' : 'healthy',
    uptime: `${(Math.random() * 100).toFixed(1)}%`,
    load: Math.random() * 100
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 relative overflow-hidden group hover:bg-gray-750 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Transaction Volume</p>
              <h3 className="text-2xl font-bold">{metrics.transactionVolume} tx/s</h3>
            </div>
            <Waves className="text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 relative overflow-hidden group hover:bg-gray-750 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Block Time</p>
              <h3 className="text-2xl font-bold">{metrics.blockTime.toFixed(2)} sec</h3>
            </div>
            <Cpu className="text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 relative overflow-hidden group hover:bg-gray-750 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Confirmation Rate</p>
              <h3 className="text-2xl font-bold">{(metrics.confirmationRate * 100).toFixed(1)}%</h3>
            </div>
            <Shield className="text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 relative overflow-hidden group hover:bg-gray-750 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Nodes</p>
              <h3 className="text-2xl font-bold">{metrics.nodeCount}</h3>
            </div>
            <Server className="text-orange-400" />
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Status */}


        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="text-blue-400" />
            Network Status
          </h2>



          <div className="grid  lg:grid-cols-3 gap-6">
            {/* Node Visualization */}
            <div className="lg:col-span-4 bg-gray-800 rounded-lg p-6">
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

          </div>
          <div className="grid grid-cols- gap-4">
            <div className="bg-blue-500/20 rounded-lg p-4 max-w-full text-center">
              <h4 className="text-2xl font-bold">{metrics.peerCount}</h4>
              <p className="text-gray-400">Peers Connected</p>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4 text-center">
              <h4 className="text-2xl font-bold">{metrics.syncStatus}</h4>
              <p className="text-gray-400">Sync Status</p>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
              <h4 className="text-2xl font-bold">{metrics.hashRate.toLocaleString()} H/s</h4>
              <p className="text-gray-400">Hashrate</p>
            </div>

            {/* Security & Alerts */}
      <div className="mt-8 bg-red-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-yellow-400" />
          Security Alerts
        </h2>
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="bg-red-500/20 p-4 rounded-lg">
                <p className="font-semibold text-white">{alert.message}</p>
                <p className="text-sm text-gray-400">Level: {alert.level}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No new alerts</p>
        )}
      </div>
          </div>


        </div>
                


        {/* Nodes Table */}
        <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="text-orange-400" />
            Node Health Overview
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 text-gray-400">Node ID</th>
                <th className="py-2 px-4 text-gray-400">Status</th>
                <th className="py-2 px-4 text-gray-400">Sync Status</th>
                <th className="py-2 px-4 text-gray-400">Peers</th>
                <th className="py-2 px-4 text-gray-400">CPU Usage</th>
                <th className="py-2 px-4 text-gray-400">Memory Usage</th>
              </tr>
            </thead>
            <tbody>
              {metrics.nodes.map(node => (
                <tr key={node.id}>
                  <td className="py-2 px-4">{node.id}</td>
                  <td className={`py-2 px-4 ${node.status === 'Healthy' ? 'text-green-400' : 'text-red-400'}`}>{node.status}</td>
                  <td className={`py-2 px-4 ${node.syncStatus === 'Synchronized' ? 'text-green-400' : 'text-yellow-400'}`}>{node.syncStatus}</td>
                  <td className="py-2 px-4">{node.peers}</td>
                  <td className="py-2 px-4">{node.cpuUsage}%</td>
                  <td className="py-2 px-4">{node.memoryUsage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
    </div>
  );
};

export default BlockchainHealthDashboard;
