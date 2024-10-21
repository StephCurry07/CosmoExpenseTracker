let subscriptions = [];

export const subscriptionsStore = {
  setSubscriptions: (newSubscriptions) => {
    subscriptions = newSubscriptions; // Set the entire subscriptions array
  },
  addSubscription: (subscription) => {
    subscriptions.push(subscription); // Add a single subscription
  },
  clearSubscriptions: () => {
    subscriptions = []; // Clear all subscriptions
  },
  getSubscriptions: () => subscriptions, // Get the current subscriptions array
};
