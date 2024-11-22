import React, { useState } from 'react';
import { Item, ItemSet } from '../types';
import { motion } from 'framer-motion';
import { X, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ItemSetBuilderProps {
  onClose: () => void;
  itemSets: ItemSet[];
  onSaveSet: (set: ItemSet) => void;
  items: Item[];
}

const ItemSetBuilder: React.FC<ItemSetBuilderProps> = ({
  onClose,
  itemSets,
  onSaveSet,
  items
}) => {
  const [setName, setSetName] = useState('');
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddItem = (item: Item) => {
    if (selectedItems.length < 6) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (setName && selectedItems.length > 0) {
      onSaveSet({
        id: Date.now().toString(),
        name: setName,
        items: selectedItems,
        createdAt: new Date().toISOString()
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0A1428] border border-[#785A28] rounded-lg w-full max-w-4xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#785A28]">
            <h2 className="text-2xl font-bold text-[#F0E6D2]">Créer un set d'objets</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <Input
                type="text"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                placeholder="Nom du set"
                className="bg-[#1E2328] border-[#785A28] text-[#F0E6D2]"
              />
            </div>

            {/* Selected Items */}
            <div className="bg-[#1E2328] rounded-lg p-4 mb-6">
              <h3 className="text-[#F0E6D2] font-bold mb-4">Objets sélectionnés ({selectedItems.length}/6)</h3>
              <div className="grid grid-cols-6 gap-2">
                {Array(6).fill(null).map((_, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded border border-dashed border-[#785A28] bg-black/20"
                  >
                    {selectedItems[index] ? (
                      <>
                        <img
                          src={selectedItems[index].image}
                          alt={selectedItems[index].name}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#785A28]">
                        <Plus className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Item Selection */}
            <div className="bg-[#1E2328] rounded-lg p-4">
              <h3 className="text-[#F0E6D2] font-bold mb-4">Ajouter des objets</h3>
              <div className="grid grid-cols-8 gap-2">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddItem(item)}
                    className="relative group"
                    disabled={selectedItems.length >= 6}
                  >
                    <div className="relative aspect-square rounded overflow-hidden border border-[#785A28] transition-transform duration-200 group-hover:scale-110">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.gold && (
                        <div className="absolute bottom-0 right-0 bg-black/80 px-1 text-[10px] text-[#C89B3C]">
                          {item.gold.total}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-[#1E2328] border border-[#785A28] rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <p className="text-[#F0E6D2] text-xs text-center truncate">{item.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#785A28] p-6 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={!setName || selectedItems.length === 0}
              className="bg-[#785A28] hover:bg-[#C89B3C] text-[#F0E6D2]"
            >
              <Save className="w-4 h-4 mr-2" />
              SAUVEGARDER LE SET
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ItemSetBuilder;

