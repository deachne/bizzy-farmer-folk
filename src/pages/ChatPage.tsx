
const addImageToContext = (imageUrl: string, imageName: string) => {
  const newContextImage: ContextImage = {
    id: Date.now().toString(),
    url: imageUrl,
    name: imageName,
    addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  setContextImages(prev => {
    // Check if the image is already in context to prevent duplicates
    if (prev.some(img => img.url === imageUrl)) {
      toast({
        title: "Image already in context",
        description: "This image is already in your context panel",
        duration: 3000,
      });
      return prev;
    }
    
    toast({
      title: "Image added to context",
      description: "The image has been added to your context panel",
      duration: 3000,
    });
    return [...prev, newContextImage];
  });
};
