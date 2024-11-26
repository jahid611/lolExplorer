
import { useParams, Link } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import itemDescriptions from '../data/itemdesc.json';

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const { items } = useItems();
  const item = items.find(i => i.id === id);
  const itemDesc = itemDescriptions[id as keyof typeof itemDescriptions];

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#010A13] text-white p-8">
      <Link to="/">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
      </Link>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <img src={item.image} alt={item.name} className="w-24 h-24 mr-6" />
          <div>
            <h1 className="text-3xl font-bold text-[#C89B3C] mb-2">{item.name}</h1>
            <p className="text-xl">{item.gold.total} gold</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Statistiques</h2>
            <ul>
              {Object.entries(item.stats).map(([stat, value]) => (
                <li key={stat} className="mb-2">
                  <span className="text-[#C89B3C]">{stat}:</span> {value}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-300">{itemDesc?.description || item.description}</p>
            
            {itemDesc?.active && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#C89B3C] mb-2">Active</h3>
                <p>{itemDesc.active}</p>
              </div>
            )}
            
            {itemDesc?.passive && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-[#C89B3C] mb-2">Passive</h3>
                <p>{itemDesc.passive}</p>
              </div>
            )}
          </div>
        </div>
        
        {item.from && item.from.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Composants</h2>
            <div className="flex flex-wrap gap-4">
              {item.from.map(componentId => {
                const componentItem = items.find(i => i.id === componentId);
                return componentItem ? (
                  <Link to={`/item/${componentId}`} key={componentId} className="block">
                    <div className="bg-[#1E2328] p-2 rounded-lg hover:bg-[#2A2E35] transition-colors">
                      <img src={componentItem.image} alt={componentItem.name} className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-center text-sm">{componentItem.name}</p>
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}
        
        {item.into && item.into.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Se transforme en</h2>
            <div className="flex flex-wrap gap-4">
              {item.into.map(upgradeId => {
                const upgradeItem = items.find(i => i.id === upgradeId);
                return upgradeItem ? (
                  <Link to={`/item/${upgradeId}`} key={upgradeId} className="block">
                    <div className="bg-[#1E2328] p-2 rounded-lg hover:bg-[#2A2E35] transition-colors">
                      <img src={upgradeItem.image} alt={upgradeItem.name} className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-center text-sm">{upgradeItem.name}</p>
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

