# IPTV API Backend

A comprehensive Node.js/Express backend API for IPTV (Internet Protocol Television) services with Xtream Codes compatibility. This API provides complete management for live streams, Video on Demand (VOD), and series content with file upload capabilities.

## 🚀 Features

### Core Functionality
- **Xtream Codes API Compatibility** - Works with popular IPTV players
- **Live Streaming Management** - Categories and streams with file upload
- **Video on Demand (VOD)** - Movie management with metadata
- **Series Management** - Complete series, seasons, and episodes structure
- **File Upload Support** - MP4, M3U8, and TS video formats
- **MongoDB Integration** - Persistent data storage with auto-incrementing IDs
- **CORS Support** - Cross-origin requests for web applications

### API Features
- RESTful API endpoints for all content types
- File upload with Multer middleware
- Authentication system
- M3U playlist generation
- EPG (Electronic Program Guide) support
- Streaming endpoints for media files

## 📁 Project Structure

```
IPTV_API/
├── config/
│   └── config.js              # Server configuration
├── controllers/               # API controllers
│   ├── adminController.js     # Live streams & categories
│   ├── adminVodController.js  # VOD streams & categories
│   ├── adminSeriesController.js # Series streams & categories
│   ├── adminSeasonController.js # Seasons management
│   └── adminEpisodeController.js # Episodes management
├── models/                    # MongoDB models
│   ├── LiveCategory.js        # Live categories schema
│   ├── LiveStream.js          # Live streams schema
│   ├── VodCategory.js         # VOD categories schema
│   ├── VodStream.js           # VOD streams schema
│   ├── SeriesCategory.js      # Series categories schema
│   ├── SeriesStream.js        # Series streams schema
│   ├── Season.js              # Seasons schema
│   ├── Episode.js             # Episodes schema
│   └── Counter.js             # Auto-increment counter
├── routes/                    # API routes
│   ├── adminRoutes.js         # Live streams routes
│   ├── VodRoutes.js           # VOD routes
│   ├── SeriesRoutes.js        # Series routes
│   ├── SeasonRoutes.js        # Seasons routes
│   └── EpisodeRoutes.js       # Episodes routes
├── server.js                  # Main server file
├── check_files.js             # File validation utility
├── seeds.js                   # Database seeding
└── package.json               # Dependencies
```

## 🛠️ Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Mongoose-Sequence** - Auto-incrementing IDs

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Configuration
Update `config/config.js`:
```javascript
module.exports = {
    PORT: 8080,
    URL: "mongodb://localhost:27017/iptv"
}
```

### 3. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 4. Run the Server
```bash
npm start
# or
node server.js
```

The API server will start on `http://localhost:8080`

## 📡 API Endpoints

### Xtream Codes API (IPTV Player Compatible)

#### Authentication
- **Username**: `test` (configurable in server.js)
- **Password**: `test` (configurable in server.js)

#### Core Endpoints
```
GET /player_api.php          # Xtream Codes API
GET /get.php                 # M3U playlist generation
GET /xmltv.php               # EPG (Electronic Program Guide)
```

#### Streaming Endpoints
```
GET /live/:username/:password/:stream_id        # Live stream
GET /live/:username/:password/:stream_id.:ext   # Live stream with extension
GET /movie/:username/:password/:vod_id          # VOD stream
GET /movie/:username/:password/:vod_id.:ext     # VOD stream with extension
GET /series/:username/:password/:series_id      # Series stream
GET /series/:username/:password/:series_id.:ext # Series stream with extension
GET /episode/:username/:password/:episode_id    # Episode stream
GET /episode/:username/:password/:episode_id.:ext # Episode stream with extension
```

### Admin API Endpoints

#### Live Streams Management
```
GET    /admin/live-categories           # Get all live categories
POST   /admin/create-live-category      # Create live category
PUT    /admin/update-live-category/:id  # Update live category
DELETE /admin/delete-live-category/:id  # Delete live category

GET    /admin/live-streams              # Get all live streams
POST   /admin/create-live-stream        # Create live stream (with file upload)
PUT    /admin/update-live-stream/:id    # Update live stream (with file upload)
DELETE /admin/delete-live-stream/:id    # Delete live stream
```

#### VOD Management
```
GET    /admin-vod/vod-categories        # Get all VOD categories
POST   /admin-vod/create-vod-category   # Create VOD category
PUT    /admin-vod/update-vod-category/:id # Update VOD category
DELETE /admin-vod/delete-vod-category/:id # Delete VOD category

GET    /admin-vod/vod-streams           # Get all VOD streams
POST   /admin-vod/create-vod-stream     # Create VOD stream (with file upload)
PUT    /admin-vod/update-vod-stream/:id # Update VOD stream (with file upload)
DELETE /admin-vod/delete-vod-stream/:id # Delete VOD stream
```

#### Series Management
```
GET    /admin-series/series-categories  # Get all series categories
POST   /admin-series/create-series-category # Create series category
PUT    /admin-series/update-series-category/:id # Update series category
DELETE /admin-series/delete-series-category/:id # Delete series category

GET    /admin-series/series-streams     # Get all series streams
POST   /admin-series/create-series-stream # Create series stream
PUT    /admin-series/update-series-stream/:id # Update series stream
DELETE /admin-series/delete-series-stream/:id # Delete series stream
```

#### Seasons Management
```
GET    /admin-seasons/seasons           # Get all seasons
POST   /admin-seasons/create-season     # Create season
PUT    /admin-seasons/update-season/:id # Update season
DELETE /admin-seasons/delete-season/:id # Delete season
GET    /admin-seasons/season/:id        # Get season with episodes
```

#### Episodes Management
```
GET    /admin-episodes/episodes         # Get all episodes
POST   /admin-episodes/create-episode   # Create episode (with file upload)
PUT    /admin-episodes/update-episode/:id # Update episode (with file upload)
DELETE /admin-episodes/delete-episode/:id # Delete episode
```

## 📊 Data Models

### LiveStream
```javascript
{
    stream_id: Number,        // Auto-incrementing unique ID
    name: String,             // Stream name (unique)
    category_id: Number,      // Category reference
    file: String,             // Video file path (unique)
    stream_icon: String,      // Logo/icon URL
    tv_archive: Number,       // Archive flag
    tv_archive_duration: Number, // Archive duration
    custom_sid: String,       // Custom stream ID
    added: Date,              // Creation date
    description: String       // Stream description
}
```

### VodStream
```javascript
{
    vod_id: Number,           // Auto-incrementing unique ID
    name: String,             // Movie name (unique)
    title: String,            // Movie title
    category_id: Number,      // Category reference (required)
    file: String,             // Video file path (unique)
    stream_type: String,      // Stream type
    stream_icon: String,      // Poster/icon URL
    added: Date,              // Creation date
    direct_source: String,    // Direct source URL
    rating: Number,           // Rating (0-10)
    rating_5based: Number,    // Rating (0-5)
    is_adult: Number,         // Adult content flag
    year: String,             // Release year
    duration: String,         // Movie duration
    director: String,         // Director name
    plot: String,             // Movie plot
    release_date: String,     // Release date
    genre: String             // Movie genre
}
```

### Episode
```javascript
{
    episode_id: Number,       // Auto-incrementing unique ID
    series_id: Number,        // Series reference (required)
    season_id: Number,        // Season reference (required)
    season_number: Number,    // Season number (required)
    episode_number: Number,   // Episode number (required)
    name: String,             // Episode name (required)
    file: String,             // Video file path (required)
    description: String,      // Episode description
    duration: String,         // Episode duration
    added: Date              // Creation date
}
```

## 🎯 File Upload

### Supported Formats
- **MP4** (.mp4)
- **HLS** (.m3u8)
- **MPEG Transport Stream** (.ts)

### Upload Locations
- **Live Streams**: `../My DATA/LIVE/`
- **VOD Content**: `../My DATA/VOD/`
- **Episodes**: `../My DATA/SERIES/`

### Upload Example
```javascript
// Using FormData for file upload
const formData = new FormData();
formData.append('file', videoFile);
formData.append('name', 'Stream Name');
formData.append('category_id', '1');

fetch('/admin/create-live-stream', {
    method: 'POST',
    body: formData
});
```

## 🔧 Configuration

### Server Settings
Edit `config/config.js`:
```javascript
module.exports = {
    PORT: 8080,                                    // Server port
    URL: "mongodb://localhost:27017/iptv"          // MongoDB connection
}
```

### Authentication
Edit `server.js`:
```javascript
const USERNAME = 'test';  // Change default username
const PASSWORD = 'test';  // Change default password
```

## 🎮 IPTV Player Integration

### M3U Playlist URL
```
http://your-server-ip:8080/get.php?username=test&password=test&type=m3u
```

### EPG URL
```
http://your-server-ip:8080/xmltv.php?username=test&password=test
```

### Player Configuration
- **Server URL**: `http://your-server-ip:8080`
- **Username**: `test`
- **Password**: `test`
- **Port**: `8080`


## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   sudo systemctl status mongod
   
   # Start MongoDB
   sudo systemctl start mongod
   ```

2. **File Upload Issues**
   - Ensure `My DATA` folder exists and has proper permissions
   - Check file format compatibility (.mp4, .m3u8, .ts only)
   - Verify file size limits

3. **Streaming Issues**
   - Check if media files exist in correct directories
   - Verify file paths in database entries
   - Ensure proper CORS headers

4. **Port Already in Use**
   ```bash
   # Find process using port 8080
   lsof -i :8080
   
   # Kill process
   kill -9 <PID>
   ```

## 📝 API Response Examples

### Success Response
```json
{
    "success": true,
    "data": {
        "stream_id": 1,
        "name": "Example Stream",
        "category_id": 1,
        "file": "example.mp4"
    }
}
```

### Error Response
```json
{
    "error": "Stream not found",
    "status": 404
}
```

## 🔒 Security Considerations

- Change default username/password in production
- Implement proper authentication middleware
- Validate file uploads and file types
- Use HTTPS in production
- Implement rate limiting
- Sanitize user inputs

## 📈 Performance Optimization

- Use MongoDB indexes for frequently queried fields
- Implement caching for playlist generation
- Use CDN for media file delivery
- Optimize file upload handling
- Implement connection pooling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This API is designed for personal use and educational purposes. Ensure you have proper rights to stream any content you upload.
