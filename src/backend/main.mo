import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  // Product and Contact types
  type Product = {
    id : Nat;
    name : Text;
    price : Nat; // Price in USD cents
    category : Text;
    description : Text;
    imageUrl : Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  // Product storage
  let products = Map.fromIter<Nat, Product>([(
    0,
    {
      id = 0;
      name = "Classic White T-Shirt";
      price = 2000;
      category = "Men";
      description = "A timeless classic white t-shirt for everyday wear.";
      imageUrl = "https://example.com/images/white-tshirt.jpg";
    },
  ), (
    1,
    {
      id = 1;
      name = "Women's Summer Dress";
      price = 3500;
      category = "Women";
      description = "Light and breezy summer dress for women.";
      imageUrl = "https://example.com/images/summer-dress.jpg";
    },
  ), (
    2,
    {
      id = 2;
      name = "Leather Belt";
      price = 1500;
      category = "Accessories";
      description = "High-quality leather belt for men and women.";
      imageUrl = "https://example.com/images/leather-belt.jpg";
    },
  )].values());

  // Contact messages storage
  let contactMessages = List.empty<ContactMessage>();

  // Add product - internal, not exposed (for future use)
  func addProductInternal(product : Product) {
    products.add(product.id, product);
  };

  // Get all products
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Get products by category
  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filtered = products.values().filter(
      func(product) {
        Text.equal(product.category, category);
      }
    );
    filtered.toArray();
  };

  // Get product by id
  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Submit contact message
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      message;
    };
    contactMessages.add(contactMessage);
  };
};
